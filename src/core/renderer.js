define([
  'core/helper'
],
function(helper){
//---------------------------------------------------
// BEGIN code for this module
//---------------------------------------------------

function Renderer(options){
  this.options = helper.extend({
    layerGap: 60,
    labelHeight: 10
  }, options);
}

function L(x, y){
  return ['L', x, y].join(' ');
}

function M(x, y){
  return ['M', x, y].join(' ');
}

function C(cx1, cy1, cx2, cy2, x, y){
  return ['C', cx1, cy1, cx2, cy2, x, y].join(' ');
}

function verticalConnect(x1, y1, x2, y2){
  var midY = (y1+y2)/2;
  return C(x1, midY, x2, midY, x2, y2);
}

// Renderer.prototype.generatePoints = function(node){
//   var points = [];
//   var options = this.options;

//   var yPos = 0;
//   node.getPathFromRoot().forEach(function(hop, level){
//     if(level===0){
//       steps.push([hop.idealPos, yPos]);
//     }
//     else{
//       yPos += options.labelHeight;
//       steps.push([hop.idealPos, yPos]);
//     }
//     steps.push([hop.currentPos, yPos + options.layerGap]);
//     yPos += options.layerGap;
//   });

//   return points;
// };

Renderer.prototype.layerPos = function(node){
  var options = this.options;
  return node.getLevel() * (options.layerGap + options.labelHeight) + options.layerGap;
};

Renderer.prototype.verticalPath = function(node){
  var options = this.options;

  var hops = node.getPathFromRoot();
  var steps = [];

  var yPos = 0;
  hops.forEach(function(hop, level){
    if(level===0){
      steps.push(M(hop.idealPos, yPos));
    }
    else{
      yPos += options.labelHeight;
      steps.push(L(hop.idealPos, yPos));
    }
    steps.push(verticalConnect(
      hop.idealPos, yPos,
      hop.currentPos, yPos + options.layerGap
    ));
    yPos += options.layerGap;
  });

  return steps.join(' ');
};

// return module
return Renderer;

//---------------------------------------------------
// END code for this module
//---------------------------------------------------
});