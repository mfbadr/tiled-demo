var game = new Phaser.Game(300, 320, Phaser.CANVAS, 'tiled', {preload:preload, create:create, update:update});

function preload(){
  game.load.tilemap('map', '/assets/tiled.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('desert', '/assets/tmw_desert_spacing.png');
  game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
  game.load.spritesheet('coin', '/assets/coin.png', 32, 32);
  game.load.spritesheet('balls', '/assets/balls.png', 17, 17);
}

var map, background, scenery, plants, dude, cursors;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //***************MAP************//
  map = game.add.tilemap('map');
  map.addTilesetImage('desert', 'desert');
  background = map.createLayer('Background');
  background.resizeWorld();
  scenery = map.createLayer('Scenery');
  scenery.resizeWorld();
  plants  = map.createLayer('plants');
  plants.resizeWorld();

  //***************DUDE************//
  dude = game.add.sprite(20, 20, 'dude');
  game.physics.arcade.enable(dude);
  dude.body.collideWorldBounds = true;
  game.camera.follow(dude);
  dude.animations.add('left', [0, 1, 2, 3], 10, true);
  dude.animations.add('right', [5, 6, 7, 8], 10, true);

  cursors = game.input.keyboard.createCursorKeys();

}

function update(){
  movePlayer();
}

function movePlayer(){
  dude.body.velocity.x = 0;
  dude.body.velocity.y = 0;


  if(cursors.left.isDown){
    dude.body.velocity.x = -150;
    dude.animations.play('left');
  }else if(cursors.right.isDown){
    dude.body.velocity.x = 150;
    dude.animations.play('right');
  }else if(cursors.up.isDown){
    dude.body.velocity.y = -150;
  }else if(cursors.down.isDown){
    dude.body.velocity.y = 150;
  }else{
    dude.animations.stop();
    dude.frame = 4;

  }
}
