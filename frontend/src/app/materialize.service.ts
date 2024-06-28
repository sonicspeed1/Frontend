import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterializeService {
  initializeMaterialize() {
    if (typeof window !== 'undefined') {
      import('materialize-css').then((M) => {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
      });
    }
  }
}