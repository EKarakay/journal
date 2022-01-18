import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ColDef} from 'ag-grid-community';

import deliveryTypes from '../../assets/data/deliveryTypes.json';
import deliveryStatuses from '../../assets/data/deliveryStatuses.json';
import dbJson from '../../assets/data/db.json';

@Component({
  selector: 'app-departure-search',
  templateUrl: './departure-search.component.html',
  styleUrls: ['./departure-search.component.scss']
})

export class DepartureSearchComponent implements OnInit {
  types = deliveryTypes.items;
  statuses = deliveryStatuses.items;
  db = dbJson;
  searchFormGroup = new FormGroup({
    searchInput: new FormControl(''),
    searchType: new FormControl('Доставка'),
    searchStatus: new FormControl('Все'),
    searchStatusProblem: new FormControl(''),
  });
  columnDefs: ColDef[] = [
    {field: 'sendingDate', headerName: 'Дата отправления'},
    {field: 'departureDetails.number', headerName: 'Номер отправления'},
    {field: 'status', headerName: 'Статус'},
    {field: 'type', headerName: 'Тип'},
    {colId: 'problems', valueGetter: 'data.problems ? "Да" : "Нет"', headerName: 'Проблемы', sortable: false,},
    {field: 'responsible', headerName: 'Ответственный'},
    {field: 'sender.city', headerName: 'Отправитель.Город'},
    {field: 'receiver.city', headerName: 'Получатель.Город'},
    {field: 'receiver.phoneNumber', headerName: 'номер телефона'},
    {field: 'receivingDate', headerName: 'Дата доставки'},
    {field: 'departureDetails.qurrentPosition', headerName: 'Местонахождение'},
    {field: 'departureDetails.courierName', headerName: 'Курьер'},
    {field: 'departureDetails.courierPhone', headerName: 'Телефон курьера'},
    {field: 'departureDetails.note', headerName: 'Примечание (комментарий)'},
    {field: 'departureDetails.storagePeriod', headerName: 'Срок хранения на складе'},
    {field: 'departureDetails.payerName', headerName: 'Плательщик'},
  ];
  rowSelection = 'single';
  rowData = this.db;
  defaultColDef = {
    sortable: true,
  };
  isVisibleFilter = false;
  isVisibleCard = false;
  rowCount: any;
  transform = '';

  ngOnInit() {
    this.onSearch();
  }

  onSearch() {
    const number = this.searchFormGroup.value.searchInput.toString();
    const type = this.searchFormGroup.value.searchType;
    const status = this.searchFormGroup.value.searchStatus;
    const problems = this.searchFormGroup.value.searchStatusProblem || false;
    let filterNumber, filterType, filterStatus = [];
    (number === '') ? filterNumber = this.db : filterNumber = this.db.filter((ele) => ele.departureDetails.number.includes(number.toString()));
    (type === 'Все') ? filterType = filterNumber : filterType = filterNumber.filter((ele) => ele.type.includes(type));
    (status === 'Все') ? filterStatus = filterType : filterStatus = filterType.filter((ele) => ele.status.includes(status));
    this.rowData = filterStatus.filter((ele) => ele.problems.toString().includes(problems.toString()));
    this.isVisibleCard = false;
  }

  onClearForm() {
    this.searchFormGroup.setValue({
      searchInput: '',
      searchType: 'Доставка',
      searchStatus: 'Все',
      searchStatusProblem: ''
    });
    this.onSearch();
  }

  onRowSelected(event: any) {
    this.rowCount = event.data;
    this.isVisibleCard = true;
    this.onExpandForm(true);
  }

  onExpandForm(isRowSelected: boolean = false) {
    if (isRowSelected && this.isVisibleFilter) {
      this.isVisibleFilter = !this.isVisibleFilter;
      this.transform = '';
      this.isVisibleCard = true;
    }
    if (!isRowSelected) {
      this.isVisibleFilter = !this.isVisibleFilter;
      (this.transform === '') ? this.transform = 'transform: rotate(180deg)' : this.transform = '';
      this.isVisibleCard = false;
    }
  }

  onInput() {
    let number = this.searchFormGroup.value.searchInput.toString();
    this.searchFormGroup.setValue({
      searchInput: number.replace(/[^\d.-]/g, ''),
      searchType: this.searchFormGroup.value.searchType,
      searchStatus: this.searchFormGroup.value.searchStatus,
      searchStatusProblem: this.searchFormGroup.value.searchStatusProblem,
    });
  }
}
