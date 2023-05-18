import { Injectable } from '@angular/core';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfCourseService {

  constructor() { }


  getBase64ImageFromURL(url: any ) {
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


  async generatePDF() {

    const imageSecretaryEducation = await this.getBase64ImageFromURL("../../../assets/course-objects/logo-secretaria-educacion.png");
    const imageYavirac = await this.getBase64ImageFromURL("../../../assets/course-objects/Logo Yavirac.png");

    var docDefinition = {
      content: [
        {
          columns: [
            {
              image: `${imageSecretaryEducation}`,
              fit: [30, 30]
              // width: 150
            },
            {
              image: `${imageYavirac}`,
              fit: [30, 30],
              // width: 100,
              alignment: 'center',
              // height:100
            },
            {
              text: 'vresbv',

            }
          ],
          // columns: [
          //   {
          //     // Primera columna con imagen alineada a la izquierda
          //     width: '33%',
          //     alignment: 'left',
          //     image: `${imageSecretaryEducation}`,
          //   },
          //   {
          //     // Segunda columna con imagen centrada
          //     width: '33%',
          //     alignment: 'center',
          //     image: 'ruta_de_la_imagen2.jpg'
          //   },
          //   {
          //     // Tercera columna con texto de código
          //     width: '33%',
          //     text: 'Tu código aquí',
          //     fontSize: 10,
          //     alignment: 'right'
          //   }
          // ]
        },
      ],


    }

    var dd = {
      content: [
        {
          text: 'This paragraph uses header style and extends the alignment property',
          style: 'header',
          alignment: 'center'
        },
        {
          text: [
            'This paragraph uses header style and overrides bold value setting it back to false.\n',
            'Header style in this example sets alignment to justify, so this paragraph should be rendered \n',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
            ],
          style: 'header',
          bold: false
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
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

}
