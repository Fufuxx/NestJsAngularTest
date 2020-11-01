
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import {
  HttpClientTestingModule
} from '@angular/common/http/testing';

import { generateAccounts } from '../../../../shared/models/account';
import { DataTableComponent } from './datatable.component';

import { ComputedValueModule } from './../computed-value/computed-value.module';
import { HighlightModule } from './../../directives/highlight.directive';
import { TypeofPipe } from './../../pipes/typeof.pipe';

describe('AppComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  const MATERIAL_MODULES = [
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ];
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        HighlightModule,
        ComputedValueModule,
        HttpClientTestingModule,
        ...MATERIAL_MODULES
      ],
      declarations: [
        DataTableComponent,
        TypeofPipe
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.dataTable = {
      columns: [
        { label: 'Account Name', isSortable: true, key: 'name' },
        { label: 'Category', isSortable: true, key: 'category' },
        { label: 'Tags', isSortable: false, key: 'tags' },
        { label: 'Balance', isSortable: false, key: 'balance' },
        { label: 'Available Balance', isSortable: false, key: 'availableBalance' }
      ],
      data: generateAccounts(15)
    };
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should paint the table properly', () => {
    component.ngAfterViewInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    // -> Check columns 
    compiled.querySelectorAll('.mat-sort-header-content').forEach((el, index) => {
      // Material adds on spaces on beginning and end of string
      expect(el.textContent).toBe(` ${component.dataTable.columns[index].label} `);
    });
    // -> Should have 5 displayed rows (pagination)
    expect(compiled.querySelectorAll('.mat-row').length).toBe(5);
  });
});