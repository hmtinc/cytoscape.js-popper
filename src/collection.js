const popperRenderer = require('./render');
const createReferenceObject = require('./createReferenceObject');
const assign = require('./assign');

//Create apopper object for first element in a collection
module.exports.popper = function (userOptions) {
  warn(this);
  return popperRenderer.createPopperObject(this[0], createOptionsObject(this[0], userOptions));
};

//Create a reference object for a element in a collection
module.exports.popperRef = function (userOptions) {
  warn(this);
  return createReferenceObject.getRef(this[0], createOptionsObject(this[0], userOptions));

};

//Create a options object with required default values
function createOptionsObject(target, userOptions) {
  //Set Defaults
  let defaults = {
    getDimensions: (target) => ({ w: target.renderedWidth(), h: target.renderedHeight() }),
    position: (target) => target.isNode() ? getRenderedCenter(target, defaults.getDimensions) : getRenderedMidpoint(target),
    popper : {},
    cy: target.cy()
  };

  //Create a user options object
  userOptions = assign( {}, defaults, userOptions );

  return userOptions;
}

//Get the rendered center
function getRenderedCenter(target, getDimensions){
  let pos = target.renderedPosition();
  let dimensions = getDimensions(target);
  let offsetX = dimensions.w / 2;
  let offsetY = dimensions.h / 2;

  return {
    x : (pos.x - offsetX),
    y : (pos.y - offsetY)
  };
}

//Get the rendered position of the midpoint
function getRenderedMidpoint(target){
  let p = target.midpoint();
  let pan = target.cy().pan();
  let zoom = target.cy().zoom();

  return {
    x: p.x * zoom + pan.x,
    y: p.y * zoom + pan.y
  };
}

//Warn user about misuse of the plugin
function warn(elements) {
  //Popper.js Should only be used on 1 element
  if (elements.length > 1) {
    console.warn("Popper.js Extension should only be used on one element.");
    console.warn("Ignoring all subsequent elements");
  }
}




