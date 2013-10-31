var _ = require( 'underscore' );

(function(){
  'use strict';
  
  //optionally allow underscore to be passed through
  function Mixism( interfaces, underscore ) {
    this.interfaces = interfaces;
    this.underscore = underscore || _;
    //this stores the funcs by function name and then by interface name
    this.funcs = {};
  }
  
  Mixism.FunctionNotFoundError = function( message ) {
    this.name = 'FunctionNotFoundError';
    this.message = message || '';
  };
  Mixism.FunctionNotFoundError.prototype = new Error();  
  
  Mixism.prototype.mixin = function( mixins ) {    
    var self = this;
    var underscoreMixins = {};
    _( mixins ).each( function( functions, interfaceName ) {
      _( functions ).each( function( func, name ) {
        if( !_( self.funcs ).has( name ) ) {
          underscoreMixins[ name ] = function(){
            return self.resolve( name, arguments );
          };
          self.funcs[ name ] = {};
        } 
        self.funcs[ name ][ interfaceName ] = func;
      });
    });  
    _.mixin( underscoreMixins );
  };
  
  Mixism.prototype.resolve = function( name, args ) {
    var self = this;
    var func = _( self.funcs[ name ] ).find( function( func, interfaceName ) {
      return self.interfaces.validate( args[ 0 ], interfaceName );
    }); 
    if( _( func ).isUndefined() ) {
      throw new Mixism.FunctionNotFoundError( name );
    }    
    return func.apply( args[ 0 ], args );
  };

  module.exports = Mixism;
})();