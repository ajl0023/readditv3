module.exports = (plop) => {
  plop.setHelper("isEqual", function (value1, value2, options) {
    if (value1 == value2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  plop.setGenerator("model", {
    description: "creates a new model",
    prompts: [
      {
        type: "input",
        name: "modelName",
        message: "model name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../models/{{modelName}}.js",
        templateFile: "./templates/model.js.hbs",
        force: true,
        transform: (x) => {
          return x;
        },
      },
    ],
  });

  plop.setGenerator("route", {
    prompts: [
      {
        type: "input",
        name: "routeDir",
        message: "folder name",
      },
    ],

    actions: [
      {
        type: "add",
        path: "../routes/{{routeDir}}/routes.js",
        templateFile: "./templates/route.js.hbs",
        force: true,
        transform: (x) => {
          return x;
        },
      },
    ],
  });
};
