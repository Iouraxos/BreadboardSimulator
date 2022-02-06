class Wire {

  constructor() {
    this.scale = 10; //100 mils = 10 px
    this.color = "red";
    this.position = {
      x1: 7,
      y1: 4,
      x2: 10,
      y2: 8
    };
    this.offset = {
      x: 0,
      y: 10
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
    titleBlock.innerHTML = "Wire";

    let removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.type = "button";
    removeButton.onclick = function() {
      obj.remove();
    };
    removeButton.innerHTML = "remove";
    titleBlock.appendChild(removeButton);

    this.div.appendChild(titleBlock);


    // Color block

    let colorBlock = document.createElement("p");
    colorBlock.classList.add("formBlock");

    let colorLabel = document.createElement("span");
    colorLabel.innerHTML = "Color :";
    colorBlock.appendChild(colorLabel);

    //Create array of options to be added
    const optionArray = ["Black", "Brown", "Red", "Orange", "Yellow", "Green", "Blue", "Violet", "Gray", "White"];

    this.colorInput = document.createElement("select");

    //Create and append the options
    for (var i = 0; i < optionArray.length; i++) {
        let option = document.createElement("option");
        option.value = optionArray[i];
        option.text = optionArray[i];
        this.colorInput.appendChild(option);
    }

    this.colorInput.onchange = function() {
      obj.changeColor();
    };
    colorBlock.appendChild(this.colorInput);

    this.div.appendChild(colorBlock);


    // Position block

    let positionBlock = document.createElement("p");
    positionBlock.classList.add("formBlock");

    let positionLabel = document.createElement("span");
    positionLabel.innerHTML = "Wire position :";
    positionBlock.appendChild(positionLabel);

    this.x1PosInput = document.createElement("input");
    this.x1PosInput.classList.add('gridInput');
    this.x1PosInput.type = "number";
    this.x1PosInput.min = GRID_MIN_X;
    this.x1PosInput.max = GRID_MAX_X;
    this.x1PosInput.value = this.position.x1;
    this.x1PosInput.onchange = function() {
      obj.updatePosition()
    };
    positionBlock.appendChild(this.x1PosInput);

    this.y1PosInput = document.createElement("input");
    this.y1PosInput.classList.add('gridInput');
    this.y1PosInput.type = "number";
    this.y1PosInput.min = GRID_MIN_Y;
    this.y1PosInput.max = GRID_MAX_Y;
    this.y1PosInput.value = this.position.y1;
    this.y1PosInput.onchange = function() {
      obj.updatePosition()
    };
    positionBlock.appendChild(this.y1PosInput);

    this.x2PosInput = document.createElement("input");
    this.x2PosInput.classList.add('gridInput');
    this.x2PosInput.type = "number";
    this.x2PosInput.min = GRID_MIN_X;
    this.x2PosInput.max = GRID_MAX_X;
    this.x2PosInput.value = this.position.x2;
    this.x2PosInput.onchange = function() {
      obj.updatePosition()
    };
    positionBlock.appendChild(this.x2PosInput);

    this.y2PosInput = document.createElement("input");
    this.y2PosInput.classList.add('gridInput');
    this.y2PosInput.type = "number";
    this.y2PosInput.min = GRID_MIN_Y;
    this.y2PosInput.max = GRID_MAX_Y;
    this.y2PosInput.value = this.position.y2;
    this.y2PosInput.onchange = function() {
      obj.updatePosition()
    };
    positionBlock.appendChild(this.y2PosInput);

    this.div.appendChild(positionBlock);

    let body = document.getElementById("body");
    body.appendChild(this.div);
  }

  buildSvg() {

    // <path class="wire" d="M 100 100 L 400 400" stroke="blue"/>

    this.tintin = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.tintin.classList.add("tintin");

    this.wire = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.wire.classList.add("wire");

    this.syncDrawing();

    let svgElement = document.getElementById("svg");
    svgElement.appendChild(this.tintin);
    svgElement.appendChild(this.wire);
  }

  remove() {
    this.tintin.remove();
    this.wire.remove();
    this.div.remove();
  }

  updatePosition() {
    this.position.x1 = this.x1PosInput.value;
    this.position.y1 = this.y1PosInput.value;
    this.position.x2 = this.x2PosInput.value;
    this.position.y2 = this.y2PosInput.value;

    this.syncDrawing();
  }

  changeColor() {
    this.color = this.colorInput.value

    this.syncDrawing();
  }

  syncDrawing() {

    this.tintin.setAttribute("d",
      "M " + this.position.x1 * this.scale + " " + (this.position.y1 * this.scale) +
      " L " + this.position.x2 * this.scale + " " + this.position.y2 * this.scale);
    this.wire.setAttribute("d",
      "M " + this.position.x1 * this.scale + " " + (this.position.y1 * this.scale) +
      " L " + this.position.x2 * this.scale + " " + this.position.y2 * this.scale);

    this.wire.setAttribute("stroke", this.color);
  }

}
