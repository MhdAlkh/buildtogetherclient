import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-money-slider',
  templateUrl: './money-slider.component.html',
  styleUrls: ['./money-slider.component.scss']
})
export class MoneySliderComponent implements OnInit {

  @Input() achievedFund: number = 0;
  @Input() totalFund: number = 0;

  widthSlider: number = 0;

  constructor() {


  }

  ngOnInit(): void {

    this.widthSlider = Math.round((this.achievedFund / this.totalFund) * 100);

  }

}
