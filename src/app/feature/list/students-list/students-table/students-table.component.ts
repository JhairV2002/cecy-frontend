import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Nota } from '../interfaces/notas';
import { Persona } from '../interfaces/persona';
import { StudentsTableService } from './students-table.service';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css'],
})
export class StudentsTableComponent implements OnInit {
  constructor(
    private studentsTableService: StudentsTableService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  notas: Nota[] = [];
  personas: Persona[] = [];
  searchValue: string = '';
  selectOptions: string[] = ['Aprobado', 'Reprobado'];
  selectedOption: string = '';

  dataSource: MatTableDataSource<Nota>;

  displayedColumns: string[] = [
    'cedula',
    'nombres',
    'nota1',
    'nota2',
    'notaFinal',
    'estado',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  printForm(nota: Nota) {
    this.studentsTableService
      .updateInscriptions(nota)
      .subscribe((res) => {
        console.log(res)
        this.findAll();
      });
    console.log(nota);
  }

  // onChange($event: any) {
  //   let filteredData = this.dataSource.data.filter(
  //     (el) => el.estado.toLowerCase() === event!.value.toLowerCase()
  //   );
  //
  //   this.dataSource =
  // }

  ngOnInit() {
    this.findAll();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  findAll() {
    this.studentsTableService.getInscriptions().subscribe((res) => {
      this.notas = res;
      this.notas.forEach((nota) => {
        this.studentsTableService
          .getPerson(nota.estudianteId)
          .subscribe((res) => {
            nota.estudiante = res;
            nota.nombreEstudiante = res.nombres;
            console.log(this.notas);
          });
      });
      this.dataSource = new MatTableDataSource(this.notas);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  num: number;

  validateNum(num: number) {
    return num >= 1 && num <= 10 ? null : { outOfRange: true };
  }

}
