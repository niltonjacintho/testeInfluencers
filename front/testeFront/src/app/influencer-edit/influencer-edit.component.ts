import { Component } from '@angular/core';
import { InfluencerModel } from '../influencer.model';
@Component({
  selector: 'app-influencer-edit',
  templateUrl: './influencer-edit.component.html',
  styleUrls: ['./influencer-edit.component.scss']
})
export class InfluencerEditComponent {
  value2 = InfluencerModel.fromJson({ id: 1, fullname: 'Nilton Cesar Jacintho' });
  value = 'new InfluencerModel()';
  //   { field: "nome", headerName: "Usuário", flex: 2 },
  // { field: "fullname", headerName: "Nome", flex: 3, }
  // // { field: "nick", headerName: "Nick", flex: 1 },
  // // { field: "telefone", headerName: "Telefone", flex: 2 },
  // // { field: "email", headerName: "Email", flex: 3 },
  // // { field: "instagram", headerName: "Instagram", flex: 2 },
  // // { field: "youtube", headerName: "Youtube", flex: 2 },
  // // { field: "facebook", headerName: "Facebook", flex: 2 },
  // // { field: "outros", headerName: "Outros", flex: 2 },


  form = {
    title: "Editar Influenciador",
    groups: [
      {
        fields: [{
          name: "nick",
          type: "text",
          label: "Nick",
          required: true,
        },
        {
          name: "fullname",
          type: "text",
          label: "Nome Completo",
          required: true,
        },
        ],
      }, {
        fields: [{
          name: "telefone",
          type: "text",
          label: "Telefone",
          required: true,
        },
        {
          name: "email",
          type: "text",
          label: "Email",
          required: true,
        },
        ],
      }, {
        fields: [{
          name: "instagram",
          type: "text",
          label: "Instagram",
          required: true,
        },
        {
          name: "youtube",
          type: "text",
          label: "Youtube",
          required: true,
        }, {
          name: "facebook",
          type: "text",
          label: "Facebook",
          required: true,
        }, {
          name: "outros",
          type: "text",
          label: "Outros",
          required: true,
        },
        ],

      }],
    buttons: [
      {
        text: "Gravar",
        primary: true,
      },
    ],
  }
}
