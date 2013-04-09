# mixism

underscore mixins via interfascist

```
npm install mixism
```

## What

You can add mixins to underscore for objects implementing specific interfaces via interfascist. 

```javascript
var Mixism = require( 'mixism' );
var Interfascist = require( 'interfascist' );

var geometryInterfaces = {
  Point: {
    x: 'Number',
    y: 'Number'
  },
  Line: {
    start: 'Point',
    end: 'Point'
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
    },
    toString: function( point ) {
      return 'Point(' + point.x + ',' + point.y + ')';
    },
    debug: function( point, message ) {
      console.log( message + ': ' + _( point ).toString() );
    },
  },
  Line: {
    square: function( line ) {
      return {
        start: _( line.start ).square(),
        end: _( line.end ).square()    
      }
    },
    toString: function( line ) {
      return 'Line(' + _( line.start ).toString() + ',' + _( line.end ).toString() + ')';
    },
    debug: function( line, message ) {
      console.log( message + ': ' + _( line ).toString() );
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
    x: 2.3,
    y: -1
  }
};

_( p ).debug( 'point' );
_( l ).debug( 'line' );
_( p ).chain().square().debug( 'point squared' );
_( l ).chain().square().debug( 'line squared' );
/*
point: Point(5,3.5)
line: Line(Point(5,3.5),Point(2.3,-1))
point squared: Point(25,12.25)
line squared: Line(Point(25,12.25),Point(5.289999999999999,1))
*/
```

## Why

Just because, OK. [TODO]

## License

MIT