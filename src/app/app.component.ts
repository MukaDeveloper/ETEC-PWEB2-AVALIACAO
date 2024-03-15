import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  formImc: FormGroup;
  weight: number;
  height: number;
  imc: number;
  condition: string;
  degree: number;

  constructor() { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    const obj = this.formImc.value;
    if(obj.weight && obj.height) {
      let heightFormat = obj.height;
      if(obj.height.toString().length === 3) {
        heightFormat = obj.height.toString().slice(0, 1) + '.' + obj.height.toString().slice(1);
      }
      this.imc = obj.weight / (Number.parseFloat(heightFormat) * Number.parseFloat(heightFormat));
    }
    this.getDegree(this.imc);
  }

  getDegree(imcValue: number) {
    if(imcValue < 18.5) {
      this.condition = "Magreza";
      this.degree = 0
    } else if (this.imc >= 18.5 && this.imc <= 24.9) {
      this.condition = "Normal";
      this.degree = 0
    } else if (this.imc >= 25 && this.imc <= 29.9) {
      this.condition = "Sobrepeso";
      this.degree = 1
    } else if (this.imc >= 30 && this.imc <= 39.9) {
      this.condition = "Obesidade";
      this.degree = 2
    } else if (this.imc > 40) {
      this.condition = "Obseidade";
      this.degree = 3
    }
  }

  createForm() {
    this.formImc = new FormGroup({
      weight: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
    })
  }
}
