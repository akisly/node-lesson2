class ColoredTriangle {
    constructor() {
        this.red = 'color';
    }
}

const obj = new ColoredTriangle();

for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
        console.log(`obj.${obj[prop]} = ${prop}`);
    }
}

// expected output: "obj.color = red"