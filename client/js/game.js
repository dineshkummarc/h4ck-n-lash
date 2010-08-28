var Game = function() {
  var self = this;
  self.sprites = [];
  self.platforms = [];
  self.on_player_entry = function(ev) {
  	$('#hello').html('Hello, '+ev.player.name);
    ev.player.avatar.game = self;
    self.sprites.push(ev.player.avatar);
    self.current_level = self.get_level();
    self.build_display();
  };
  $('body').bind('player.entry', self.on_player_entry );

  self.get_level = function(level_id){
    if(!level_id) level_id = null;
    level = new Level(level_id);
    return level;
  };
  self.build_display = function(){
    //load level
    $('#level-container').html(self.current_level.html);
  };
  self.next_tick = function(){
    self.update_sprites();
    self.refresh_display();
  };

  // game loop functions
  self.start = function(){
    self.loop_timer = setInterval(function() { self.next_tick(); }, ONE_GAME_TICK);
  };
  self.pause = function() {
    clearInterval(self.loop_timer);
  };
 
  return self;
}

Game.prototype = {
  update_sprites: function(){
    $.each(this.sprites,function( i, sprite){
      sprite.update_position();
    });
  },
  refresh_display: function() {
    $('#sprite-container').html('');
    $.each(this.sprites,function( i, sprite){
      sprite.update_display(); 
      $('#sprite-container').append(sprite.dom_element); 
    });
  },
  add_platform: function(platform) {
    this.platforms.push(platform);
  },
};
