var underscore = require( 'underscore' );
var Interfascist = require( 'interfascist' );
var Mixism = require( '../index' );
var assert = require( 'assert' );

describe( 'mixism', function(){ 
  var geometryInterfaces = {
    Point: {
      x: 'Number',
      y: 'Number'
    },
    Line: {
      start: 'Point',
      end: 'Point'
    },
    Size: {
      width: 'Number',
      height: 'Number'
    }
  };

  var validator = new Interfascist( geometryInterfaces );
  var mixism = new Mixism( validator );
  var _ = mixism.underscore;

  var mixins = {
    Point: {
      square: function( point ) {
        return {
          x: point.x * point.x,
          y: point.y * point.y 
        };
      }
    },
    Line: {
      square: function( line ) {
        return {
          start: _( line.start ).square(),
          end: _( line.end ).square()    
        }
      }
    },
    Number: {
      square: function( value ) {
        return value * value;
      }
    }
  };

  mixism.mixin( mixins );

  var p = {
    x: 5,
    y: 3.5
  };

  var l = {
    start: p,
    end: {
      x: 2,
      y: -1
    }
  };
  
  var s = {
    width: 4,
    height: 3.5
  };
  
  describe( 'simple extension', function() {
    it( 'should extend the Point interface', function(){
      var sqP = _( p ).square();
      assert( sqP.x === 25 && sqP.y === 12.25 );
    });    
    it( 'should extend the Line interface', function(){
      var sqL = _( l ).square();
      assert( sqL.start.x === 25 && sqL.start.y === 12.25 && sqL.end.x === 4 && sqL.end.y === 1 );
    });     
    it( 'should extend a Number', function(){
      var sq = _( 5 ).square();
      assert( sq === 25 );
    });    
    it( 'should not extend the Size interface', function(){
      assert.throws( function(){
        var sqS = _( s ).square();
      } );    
    });
  });  
});