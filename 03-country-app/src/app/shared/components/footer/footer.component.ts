import { Component, computed } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent { 
  currentYear = computed(() => {
    return new Date().getFullYear()
  })
}
