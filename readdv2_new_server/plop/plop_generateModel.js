module.exports = async (data, generator) => {
  const { default: nodePlop } = await import("node-plop");

  // load an instance of plop from a plopfile

  const plop = await nodePlop(__dirname + "/plopfile.cjs");
  // get a generator by name
  const basicAdd = plop.getGenerator(generator);

  // run all the generator actions using the data specified

  basicAdd.runActions(data).then(function (results) {
    // do something after the actions have run
  });
};
