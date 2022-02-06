class Resistor {

  constructor() {
    this.scale = 10; //100 mils = 10 px
    this.value = 1000;
    this.position = {
      x: 11,
      y: 4
    };
    this.leadPosition = {
      dx1: 0,
      dy1: 0,
      dx2: 0,
      dy2: 0
    }

    this.buildHtml();
    this.buildSvg();
  }

  buildHtml() {

    let obj = this;
    this.div = document.createElement("div");

    // Title block
    let titleBlock = document.createElement("p");
    titleBlock.classList.add("formBlock");
    titleBlock.innerHTML = "Resistor";

    let removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.type = "button";
    removeButton.onclick = function() {
      obj.remove();
    };
    removeButton.innerHTML = "remove";
    titleBlock.appendChild(removeButton);

    this.div.appendChild(titleBlock);


    // Value block

    let valueBlock = document.createElement("p");
    valueBlock.classList.add("formBlock");

    let valueLabel = document.createElement("span");
    valueLabel.innerHTML = "Value :";
    valueBlock.appendChild(valueLabel);

    this.valueInput = document.createElement("input");
    this.valueInput.type = "text";
    this.valueInput.min = 1;
    this.valueInput.max = 10000000;
    this.valueInput.value = this.value;
    this.valueInput.onchange = function() {
      obj.changeValue();
    };
    valueBlock.appendChild(this.valueInput);

    this.div.appendChild(valueBlock);


    // Position block

    let positionBlock = document.createElement("p");
    positionBlock.classList.add("formBlock");

    let positionLabel = document.createElement("span");
    positionLabel.innerHTML = "Position :";
    positionBlock.appendChild(positionLabel);

    this.xPosInput = document.createElement("input");
    this.xPosInput.classList.add('gridInput');
    this.xPosInput.type = "number";
    this.xPosInput.min = GRID_MIN_X;
    this.xPosInput.max = GRID_MAX_X;
    this.xPosInput.value = this.position.x;
    this.xPosInput.onchange = function() {
      obj.move();
    };
    positionBlock.appendChild(this.xPosInput);

    this.yPosInput = document.createElement("input");
    this.yPosInput.classList.add('gridInput');
    this.yPosInput.type = "number";
    this.yPosInput.min = GRID_MIN_Y;
    this.yPosInput.max = GRID_MAX_Y;
    this.yPosInput.value = this.position.y;
    this.yPosInput.onchange = function() {
      obj.move();
    };
    positionBlock.appendChild(this.yPosInput);

    this.div.appendChild(positionBlock);


    // Lead block

    let leadBlock = document.createElement("p");
    leadBlock.classList.add("formBlock");

    let leadLabel = document.createElement("span");
    leadLabel.innerHTML = "Lead position :";
    leadBlock.appendChild(leadLabel);

    this.dx1PosInput = document.createElement("input");
    this.dx1PosInput.classList.add('gridInput');
    this.dx1PosInput.type = "number";
    this.dx1PosInput.min = -5;
    this.dx1PosInput.max = 5;
    this.dx1PosInput.value = this.leadPosition.dx1;
    this.dx1PosInput.onchange = function() {
      obj.changeLeadPosition();
    };
    leadBlock.appendChild(this.dx1PosInput);

    this.dy1PosInput = document.createElement("input");
    this.dy1PosInput.classList.add('gridInput');
    this.dy1PosInput.type = "number";
    this.dy1PosInput.min = -5;
    this.dy1PosInput.max = 5;
    this.dy1PosInput.value = this.leadPosition.dy1;
    this.dy1PosInput.onchange = function() {
      obj.changeLeadPosition();
    };
    leadBlock.appendChild(this.dy1PosInput);

    this.dx2PosInput = document.createElement("input");
    this.dx2PosInput.classList.add('gridInput');
    this.dx2PosInput.type = "number";
    this.dx2PosInput.min = -5;
    this.dx2PosInput.max = 5;
    this.dx2PosInput.value = this.leadPosition.dx2;
    this.dx2PosInput.onchange = function() {
      obj.changeLeadPosition();
    };
    leadBlock.appendChild(this.dx2PosInput);

    this.dy2PosInput = document.createElement("input");
    this.dy2PosInput.classList.add('gridInput');
    this.dy2PosInput.type = "number";
    this.dy2PosInput.min = -5;
    this.dy2PosInput.max = 5;
    this.dy2PosInput.value = this.leadPosition.dy2;
    this.dy2PosInput.onchange = function() {
      obj.changeLeadPosition();
    };
    leadBlock.appendChild(this.dy2PosInput);

    this.div.appendChild(leadBlock);

    let body = document.getElementById("body");
    body.appendChild(this.div);
  }

  buildSvg() {

    // Création d'un groupe qui contient tout pour ne pas à avoir à déplacer chaque forme individuellement
    this.svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.svgGroup.onclick = function() {
      console.log("resistor click");
    };


    // Création des deux titins de patte ainsi que les pattes elles-même
    let x1;
    let x2;

    this.tintin1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.tintin1.classList.add("tintin");
    x1 = -10;
    x2 = -20;
    this.tintin1.setAttribute("d", "M " + x1 + " " + 0 + " L " + x2 + " " + 0);
    this.svgGroup.appendChild(this.tintin1);

    this.tintin2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.tintin2.classList.add("tintin");
    x1 = 10;
    x2 = 20;
    this.tintin2.setAttribute("d", "M " + x1 + " " + 0 + " L " + x2 + " " + 0);
    this.svgGroup.appendChild(this.tintin2);

    this.lead1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.lead1.classList.add("wire");
    this.lead1.setAttribute("stroke", "silver");
    x1 = -10;
    x2 = -20;
    this.lead1.setAttribute("d", "M " + x1 + " " + 0 + " L " + x2 + " " + 0);
    this.svgGroup.appendChild(this.lead1);

    this.lead2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.lead2.classList.add("wire");
    this.lead2.setAttribute("stroke", "silver");
    x1 = 10;
    x2 = 20;
    this.lead2.setAttribute("d", "M " + x1 + " " + 0 + " L " + x2 + " " + 0);
    this.svgGroup.appendChild(this.lead2);


    // Création du body de la résistance
    // let bodyRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    // bodyRect.setAttribute("x", "-15");
    // bodyRect.setAttribute("y", "-5");
    // bodyRect.setAttribute("width", "30");
    // bodyRect.setAttribute("height", "10");
    // bodyRect.setAttribute("fill", "#c46623");
    let resistorBody = document.createElementNS("http://www.w3.org/2000/svg", "path");
    resistorBody.setAttribute("d",
      "M -12 -5 " +
      "A 5 5 0 0 0 -17 0 " +
      "A 5 5 0 0 0 -12 5 " +
      "A 5 5 0 0 0 -9 4 " +
      "L 9 4 " +
      "A 5 5 0 0 0 12 5 " +
      "A 5 5 0 0 0 17 0 " +
      "A 5 5 0 0 0 12 -5 " +
      "A 5 5 0 0 0 9 -4 " +
      "L -9 -4 " +
      "A 5 5 0 0 0 -12 -5" +
      "z");
    resistorBody.setAttribute("fill", "#c46623");
    this.svgGroup.appendChild(resistorBody);


    // Création du code de couleur

    this.firstBand = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.firstBand.setAttribute("x", "-9");
    this.firstBand.setAttribute("y", "-4");
    this.firstBand.setAttribute("width", "3");
    this.firstBand.setAttribute("height", "8");
    this.svgGroup.appendChild(this.firstBand);

    this.secondBand = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.secondBand.setAttribute("x", "-4");
    this.secondBand.setAttribute("y", "-4");
    this.secondBand.setAttribute("width", "3");
    this.secondBand.setAttribute("height", "8");
    this.svgGroup.appendChild(this.secondBand);

    this.thirdBand = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.thirdBand.setAttribute("x", "1");
    this.thirdBand.setAttribute("y", "-4");
    this.thirdBand.setAttribute("width", "3");
    this.thirdBand.setAttribute("height", "8");
    this.svgGroup.appendChild(this.thirdBand);

    // this.updateColorBand();

    let fourthBand = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    fourthBand.setAttribute("x", "6");
    fourthBand.setAttribute("y", "-4");
    fourthBand.setAttribute("width", "3");
    fourthBand.setAttribute("height", "8");
    fourthBand.setAttribute("fill", "url(#goldShine)");
    this.svgGroup.appendChild(fourthBand);

    resistorBody = resistorBody.cloneNode(true);
    resistorBody.setAttribute("fill", "none");
    resistorBody.setAttribute("stroke", "black");
    this.svgGroup.appendChild(resistorBody);


    this.syncDrawing();


    let svgElement = document.getElementById("svg");
    svgElement.appendChild(this.svgGroup);

  }

  remove() {
    this.svgGroup.remove();
    this.div.remove();
  }

  syncDrawing() {

    let x;
    let y;

    x = -20 + this.leadPosition.dx1 * this.scale;
    y = this.leadPosition.dy1 * this.scale;
    this.tintin1.setAttribute("d", "M -10 0 L " + x + " " + y);
    this.lead1.setAttribute("d", "M -10 0 L " + x + " " + y);

    x = 20 + this.leadPosition.dx2 * this.scale;
    y = this.leadPosition.dy2 * this.scale;
    this.tintin2.setAttribute("d", "M 10 0 L " + x + " " + y);
    this.lead2.setAttribute("d", "M 10 0 L " + x + " " + y);

    this.svgGroup.setAttribute("transform",
    "translate(" + (this.position.x * this.scale) + " " + this.position.y * this.scale + ")");

    this.updateColorBand();
  }

  changeLeadPosition(){

    this.leadPosition.dx1 = parseInt(this.dx1PosInput.value);
    this.leadPosition.dy1 = parseInt(this.dy1PosInput.value);

    this.leadPosition.dx2 = parseInt(this.dx2PosInput.value);
    this.leadPosition.dy2 = parseInt(this.dy2PosInput.value);

    this.syncDrawing();
  }

  changeValue() {
    let textInput = this.valueInput.value;
    //console.log("textInput = " + textInput);
    //console.log("textInput.length = " + textInput.length);
    let lastChar = textInput.slice(-1);
    //console.log("lastChar = " + lastChar);
    let multiplier = 1;
    switch (lastChar) {
      case "k":
        multiplier = 1000;
        textInput = textInput.slice(0, textInput.length - 1);
        break;
      case "M":
        multiplier = 1000000;
        textInput = textInput.slice(0, textInput.length - 1);
        break;
    }
    //console.log("multiplier = " + multiplier);
    //console.log("NewtextInput = " + textInput);

    let significand = Number(textInput);

    if (!isNaN(significand)) {
      let value = significand * multiplier;
      console.log("value = " + value);
      this.value = value;
      this.updateColorBand();
    } else {
      console.log("La valeur est invalide: " + textInput);
    }
  }

  move() {

    this.position.x = this.xPosInput.value;
    this.position.y = this.yPosInput.value;

    this.syncDrawing();
  }

  updateColorBand() {

    let multiplier = 0;
    let tenPower = 1;
    let value = this.value;

    while (true) {

      if (value / tenPower >= 100) {
        multiplier++;
        tenPower = tenPower * 10;
      } else {
        break;
      }
    }
    //console.log("multiplier: " + multiplier);

    let significand = value / tenPower;
    //console.log("significand: " + significand);

    let firstBand = Math.floor(significand / 10);
    //console.log("firstBand: " + firstBand);

    let secondBand = Math.floor(significand - (firstBand * 10));
    //console.log("secondBand: " + secondBand);

    const COLOR_ARRAY = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "gray", "white"];
    let bandColor;
    bandColor = COLOR_ARRAY[firstBand];
    this.firstBand.setAttribute("fill", bandColor);

    bandColor = COLOR_ARRAY[secondBand];
    this.secondBand.setAttribute("fill", bandColor);

    bandColor = COLOR_ARRAY[multiplier];
    this.thirdBand.setAttribute("fill", bandColor);
  }
}
