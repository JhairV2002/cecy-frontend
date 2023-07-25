import { Injectable } from '@angular/core';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfCourseService {

  constructor(
    private planificationCourseService: PlanificationsCoursesService
  ) { }


  async generatePDF(planificationCourse: any) {
    console.log(planificationCourse)
    const course = planificationCourse;
    const imageSecretaryEducation = await this.getBase64ImageFromURL("../../../assets/course-objects/logo-secretaria-educacion.png");
    const imageYavirac = await this.getBase64ImageFromURL("../../../assets/course-objects/Logo Yavirac.png");

    const


    docDefinition = {
      content: [
        //header images
        {
          columns: [

            {
              image: `${imageSecretaryEducation}`,
              fit: [140, 140],

            },
            {
              image: `${imageYavirac}`,
              fit: [100, 100],
              alignment: 'center',
            },
            {
              text: `Codigo del curso: ${course.planification.codeCourse ?? 'No definido'} `,
            }
          ],


        },
        //tittle
        {
          text: 'INSTITUTO TECNOLÓGICO SUPERIOR YAVIRAC',
          bold: true,
          alignment: 'center',
          fontSize: 17

        },
        {
          text: 'INFORME DE NECESIDAD DEL CURSO',
          bold: true,
          alignment: 'center',
          fontSize: 20
        },
        '\n',

        // subheader
        {
          columns: [

            {
              text: `Nombre del Docente:
                       Nombre del Curso:
                       Tipo de curso:
                       Modalidad del curso
                `,
              bold: true,
              width: 175,
              lineHeight: 1.5
            },
            {
              text: `${course.planification.user.names ?? 'No definido'} ${course.planification.user.lastnames ?? ''}
                    ${course.planification.name ?? 'No definido'}
                    ${course?.courseType?.name ?? 'No definido'}
                    ${course?.planification?.modality?.name ?? 'No definido'}
              `,
              lineHeight: 1.5
            },
          ],
        },
        //Necesidades del curso
        {
          text: 'Necesidades del Curso:',
          bold: true
        },
        {
          ul: course.needs
        },
        '\n',
        // duracion
        {
          columns: [

            {
              text: 'Duración del curso:',
              bold: true,
              width: 175
            },
            {
              text: `${course.planification.durationTime ?? 'no definido'} Horas`
            }
          ],
        },
        '\n',
        //horarios
        {
          text: 'Horarios:', bold: true
        },
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [40, '*', '*', '*', '*'],
            body: this.generateDetailPlan(course.planification.detailPlan),
          }
        },
        '\n',
        // fechas y participantes a ser inscritos
        {
          columns: [

            {
              text: `Fecha de Iniciación:
              Fecha de finalización:
              Participantes a ser inscritos:
                `,
              bold: true,
              width: 175,
              lineHeight: 1.5
            },
            {
              text: `${course.planification.startDate ?? 'No definido'}
                    ${course.planification.finishDate ?? 'No definido'}
                    ${course.participantsRegistration ?? 'No definido'}
              `,
              lineHeight: 1.5
            },
          ],
        },
        // summer and project
        {
          table: {
            layout: 'noBorders',
            widths: ['auto', '*'],
            body: [
              [{ text: 'Resumen', border: [false, false, false, false] }, { text: `${course.summary}`, border: [false, false, false, false] }],
              [{ text: 'Proyecto', border: [false, false, false, false] }, { text: `${course.project}`, border: [false, false, false, false] }]
            ],
            border: undefined
          }
        },
        '\n',
        // participant types
        {
          columns: [

            {
              text: `Indicar a que población se encuentra dirigido el curso: `,
              bold: true,
              width: 225,
            },
            {
              ul: this.generateParticipantTypes(course.targetGroups)
            },
          ],
        },
        '\n',
        '\n',
        '\n',
        '\n',
        '\n',
        '\n',
        '\n',

        // firmas
        {
          columns: [
            {
              text: `_____________________________________
                    Responsable OSC:                      .
                    Fecha:                                .`,
              alignment: 'center',
              lineHeight: 1.5
            },
            {
              text: `_____________________________________
                    Vicerrector:                          .
                    Fecha:                                .`,
              alignment: 'center',
              lineHeight: 1.5
            },
          ],
        },
        '\n',
        '\n',

        // nota
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: 'Nota: Documento que deberá ser aprobado por parte del Órgano Colegiado Superior (OCS) y del Vicerrector del Instituto, tal como lo indica la normativa y el Acuerdo 118 (Instructivo de Capacitación - Certificación por Competencias Laborales SENESCYT), en el caso que sea un registro digital, se adjuntan las firmas de responsabilidad como fotografías en las celdas correspondientes',
                  fontSize: 10 // Tamaño de letra más pequeño
                }
              ]
            ]
          }
        }

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        },
        table: {
          margin: [0, 10, 0, 0]
        }
      }
    }


    try {
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.open();
    } catch (error) {
      console.log(error);
    }
  }










  async generatePDFCurricularDesign(planificationCourse: any) {
    console.log('Plan:  ', planificationCourse)
    const course = planificationCourse;

    const text = 'rege';

    const imageSecretaryEducation = await this.getBase64ImageFromURL("../../../assets/course-objects/logo-secretaria-educacion.png");
    const imageYavirac = await this.getBase64ImageFromURL("../../../assets/course-objects/Logo Yavirac.png");

    var  docDefinition = {
      content: [
        //header images
        {
          columns: [

            {
              image: `${imageSecretaryEducation}`,
              fit: [140, 140],
              width: 140,
              margin: [0, 10, 0, 0]

            },

            {
              text: `DIRECCIÓN DE CALIFICACIÓN Y RECONOCIMIENTO FORMULARIO DE DISEÑO CURRICULAR - CAPACITACIÓN CONTINUA - `,
              alignment: 'center',
              bold: true,
              margin: [0, 5, 0, 0]

            },
            {
              image: `${imageYavirac}`,
              fit: [100, 100],
              alignment: 'right',
              width: 140

            },
          ],
        },
        '\n',
        //general information name, modality, area, speciality, duration, objective., participant types
        {
          table: {
            widths: ['auto', 'auto', '*'],
            body: [
              [
                { text: 'Nombre del curso: ', bold: true, fillColor: '#c6d9f0' },
                { text: 'Area: ', bold: true, fillColor: '#c6d9f0' },
                { text: 'Especialidad: ', bold: true, fillColor: '#c6d9f0' },
              ],
              [
                { text: `${course?.planification?.name}` },
                { text: `${course?.area?.name}` },
                { text: `${course?.speciality?.name}`, fontSize: 9 }
              ]
            ],

          }
        },
        '\n',
        {
          table: {
            widths: ['*', '*', '*'],
            body: [
              [
                { text: 'Tipo de Participante: ', bold: true, fillColor: '#c6d9f0' },
                { text: 'Modalidad: ', bold: true, fillColor: '#c6d9f0' },
                { text: 'Duración: ', bold: true, fillColor: '#c6d9f0' },
              ],
              [
                {
                  ul: this.generateParticipantTypes(course.targetGroups)
                },
                { text: `${course?.planification?.modality?.name}`, },
                { text: `${course.planification.durationTime} Horas` },
              ],
            ],

          }
        },


        '\n',
        // minim requisites
        {
          text: 'Requisitos mínimos de entrada al Curso.', bold: true
        },
        '\n',
        {
          columns: [
            //techics

            [

              {
                text: `Tecnicos: `,
                bold: true,
                width: 225,
                alignment: 'center',
              },
              {
                ol: this.generateUlObject(course?.techniquesRequisites?.technical)
              },

            ],
            //general
            [

              {
                text: `Generales: `,
                bold: true,
                width: 225,
                alignment: 'center',
              },
              {
                ol: this.generateUlObject(course?.techniquesRequisites?.general)
              },

            ],
          ],
        },
        '\n',
        //objective
        [
          { text: 'Objetivo del Curso.', bold: true },
          { text: `${course.objective}`, margin: [10, 0, 0, 0] },
        ],
        ////////////////////////////////////////////topics
        '\n',
        {
          text: 'Contenidos del Curso.', bold: true
        },
        {
          ul: this.generateTopics(course.topics)
        },

        '\n',
        //Learning Strategies
        {
          text: 'Estrategias de enseñanza - aprendizaje:',
          bold: true,
        },
        {
          ul: this.generateUlObject(course.teachingStrategies)
        },

        '\n',
        //Evaluation Mechanics
        {
          text: 'Mecanismos de evaluación. ', bold: true, alignment: 'center'
        },
        {
          columns: [
            [
              {
                text: 'Evaluación diagnóstica', bold: true, alignment: 'center'
              },
              {
                table: {
                  headerRows: 1,
                  widths: ['*', '*'],

                  body: this.generateEvaluationItems(course?.evaluationMechanisms?.diagnostic)
                }
              },
            ],

            [
              {
                text: 'Evaluación proceso formativo', bold: true, alignment: 'center'
              },
              {
                table: {
                  headerRows: 1,
                  widths: ['*', '*'],

                  body: this.generateEvaluationItems(course?.evaluationMechanisms?.formative)
                }
              },
            ],
          ]
        },
        '\n',
        [
          {
            text: 'Evaluación final', bold: true, alignment: 'center'
          },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*'],

              body: this.generateEvaluationItems(course?.evaluationMechanisms?.final)
            }
          },
        ],
        '\n',
        // learning enviroment
        {
          text: 'Entorno de Aprendizaje (Equipos, maquinarias, herramientas, materiales, materiales didácticos y de consumo para el desarrollo de la oferta de capacitación).', bold: true
        },
        '\n',
        {
          table:{
            headerRows: 1,
              widths: ['*', '*', '*'],
              body: this.generateLearningEnviroments(course?.learningEnvironments)
          }
        },


        '\n',
        //cargahoraria
        {

          table: {
            widths:['*','*'],
            body: [
              [{ text: 'Carga horaria:', bold: true, fillColor: '#c6d9f0' }, {
                table: {
                  margin:[0,0,0,0],
                  widths:['*','*'],
                  body: [
                    [{ text: 'Horas prácticas:', bold: true, border:[false,false,false,false] }, {text: `${course.practiceHours} Horas`, border:[false,false,false,false]}],
                    [{ text: 'Horas teóricas:', bold: true,border:[false,false,false,false] }, {text: `${course.theoryHours} Horas`, border:[false,false,false,false]}]
                  ]
                }
              }
              ],
              [{ text: 'Bibliografía:', bold: true, fillColor: '#c6d9f0' },{ul: this.generateUlObject(course.bibliographies)}]
            ]
          }
        },
        '\n',
        '\n',
        '\n',
        '\n',
        '\n',
        '\n',
        '\n',

        // firmas


        {
          text: `_____________________________________________
                Firma del responsable del Diseño Curricular\n
                Nombre y Apellido:____________________________
                Cédula No.: __________________________________
                Índice Dactilar: _____________________________`,
          alignment: 'center',
          lineHeight: 1.5
        },
        '\n',
        '\n',

        // nota
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: 'Nota: En el caso de disponer sólo en archivos digitales, se puede insertar las firmas de responsabilidad como imagen en las celdas correspondientes. ',
                  fontSize: 10 // Tamaño de letra más pequeño
                }
              ]
            ]
          }
        }



      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        },
        table: {
          margin: [0, 10, 0, 0]
        }
      }
    }


    try {
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.open();
    } catch (error) {
      console.log(error);
    }

  }



  generateDetailPlan(detailPlan: any[]) {
    const content = [];

    // Encabezado de la tabla
    const headerRow = ['Horario', 'Hora de inicio', 'Hora fin', 'Días', 'Workday'];
    content.push(headerRow);

    // Filas de datos
    try {
      detailPlan.forEach((item, count = 2) => {
        const row = [
          count.toString(),
          item.startedTime,
          item.endedTime,
          item.day.name,
          item.workday.name
        ];
        content.push(row);
        count = +1
      });
    } catch (error) {
      console.log(error);
    }

    return content;
  }

  generateParticipantTypes(participant: any[]) {
    const content: any[] = [];


    // Filas de datos
   try {
    participant.forEach((item) => {
      const row = [
        item.name
      ];
      if (item.name != '') {
        content.push(row);
      }
    });
   } catch (error) {
    console.log(error)
   }

    return content;
  }

  generateUlObject(technicsRequisites: any[]) {
    const content: any[] = [];
    // Filas de datos
    try {
      technicsRequisites.forEach((item) => {
        const row = [
          item
        ];
        content.push(row);
      });
    } catch (error) {
      console.log(error);
    }

    return content;
  }

  generateTopics(topics: any) {
    var content = [];

    // Recorrer los temas
    try {
      for (var i = 0; i < topics.length; i++) {
        var topic = topics[i];

        // Agregar el elemento del tema al contenido
        content.push({ text: topic.description, bold: true });

        // Verificar si el tema tiene subtemas
        if (topic.children && topic.children.length > 0) {
          var subitems = [];

          // Recorrer los subtemas
          for (var j = 0; j < topic.children.length; j++) {
            var subtopic = topic.children[j];

            // Agregar el subelemento al contenido de los subitems
            subitems.push({ text: subtopic.description, margin: [20, 0, 0, 0] }); // Aplicar margen izquierdo para subitems
          }

          // Agregar los subitems como una lista sin viñetas
          content.push({ ul: subitems, style: 'subitemList' });
        }
      }
    } catch (error) {
      console.log(error);
    }

    // Establecer los estilos para la lista sin viñetas de los subitems
    var styles = {
      subitemList: {
        ul: { // Configurar la lista sin viñetas
          marginBottom: 5
        },
        li: { // Configurar los elementos de la lista sin viñetas
          marginBottom: 5
        }
      }
    };

    return content;
  }

  generateEvaluationItems(detailPlan: any[]) {
    const content = [];

    // Encabezado de la tabla
    const headerRow = [
      { text: 'Técnica', bold: true, fillColor: '#c6d9f0' },
      { text: 'Instrumento', bold: true, fillColor: '#c6d9f0' }
    ];
    content.push(headerRow);

    // Filas de datos
    try {
      detailPlan.forEach((item) => {
        const row = [
          item.technique,
          item.instrument,
        ];
        content.push(row);
      });
    } catch (error) {
      console.log(error);
    }

    return content;
  }

  generateLearningEnviroments(detailPlan: any[]) {
    const content = [];

    // Encabezado de la tabla
    const headerRow = [
      { text: 'Instalaciones', bold: true, fillColor: '#c6d9f0' },
      { text: 'Fase teórica', bold: true, fillColor: '#c6d9f0' },
      { text: 'Fase práctica', bold: true, fillColor: '#c6d9f0' }
    ];
    content.push(headerRow);

    // Filas de datos
    try {
      detailPlan.forEach((item) => {
        const row = [
          item.installation.name,
          item.theoreticalPhase+' Horas',
          item.practicalPhase+' Horas'
        ];
        content.push(row);
      });
    } catch (error) {
      console.log(error);
    }

    return content;
  }

  getBase64ImageFromURL(url: any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        // ctx.drawImage(img, 0, 0);
        if (ctx) {
          ctx.drawImage(img, 0, 0);

          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        } else {
          reject(new Error('Failed to get 2D rendering context'));
        }

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

}
