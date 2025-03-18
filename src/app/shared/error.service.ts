import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorService {

  constructor(
    private messageService: MessageService
  ) { }

  errorHandler(err:HttpErrorResponse){
    console.log(err);

    switch (err.status) {
      case 0:
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'API adresine ulaşılamıyor' });
        break;        
      
      case 403:
        let errorMessage = "";
        for(const e of err.error.ErrorMessages){
          errorMessage += e + "\n";
        }

        this.messageService.add({ severity: 'error', summary: 'Hata', detail: errorMessage });
        break;
    
      case 404:
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'API adresi bulunamadı' });
        break;
        
      case 500:
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: err.error.errorMessages[0] });
        break;
      
    }    
  }
}