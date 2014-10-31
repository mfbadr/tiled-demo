var game = new Phaser.Game(500, 320, Phaser.CANVAS, 'tiled', {preload:preload, create:create, update:update});

function preload(){
  game.load.tilemap('map', '/assets/tiled.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('desert', '/assets/tmw_desert_spacing.png');
  game.load.spritesheet('dude', '/assets/dude.png', 32, 48);
  game.load.spritesheet('coin', '/assets/coin.png', 32, 32);
  game.load.spritesheet('balls', '/assets/balls.png', 17, 17);
}

var map, background, scenery, money, plants, dude, cursors, ground;

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
  ground  = map.createLayer('Ground');


  //***************COIN************//
  money = game.add.group();
  money.enableBody = true;
  money.physicsBodyType = Phaser.Physics.ARCADE;
  map.createFromObjects('Money', 49, 'coin', 0, true, false, money);
  money.callAll('animations.add', 'animations', 'spin', [0 , 1, 2, 3, 4, 5,], 10, true);
  money.callAll('animations.play', 'animations', 'spin');

  //***************DUDE************//
  dude = game.add.sprite(20, 20, 'dude');
  game.physics.arcade.enable(dude);
  dude.body.collideWorldBounds = true;
  dude.animations.add('left', [0, 1, 2, 3], 10, true);
  dude.animations.add('right', [5, 6, 7, 8], 10, true);
  dude.body.gravity.y = 300;

  map.setCollision(34, true, 'Ground');

  cursors = game.input.keyboard.createCursorKeys();
  game.camera.follow(dude);
}

function update(){
  game.physics.arcade.collide(dude, ground);
  game.physics.arcade.collide(money, ground);
  movePlayer();
}

function movePlayer(){
  dude.body.velocity.x = 0;
  //dude.body.velocity.y = 0;


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
