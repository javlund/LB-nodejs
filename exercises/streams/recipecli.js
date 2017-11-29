const recipes  = require('./recipes');
const input = process.argv[2] || '';

switch(input.toLowerCase()) {
  case 'read':
    console.log('Her er alle opskrifterne.\n');
    recipes.readRecipes(process.stdout);
    break;
  case 'write':
    console.log('Bare gå i gang med at skrive opskriften, afslut med en tom linje.');
    const cb = () => {
      console.log('Tak for dit bidrag.');
      process.exit();
    }
    recipes.createRecipe(process.stdin, cb);
    break;
  case 'wipe':
    recipes.clearRecipes(() => {
      console.log('Alle opskrifter slettet.');
      process.exit();
    });
    break;
  default:
    console.log('Giv enten "read", "write" eller "wipe" med som parameter.');
    process.exit();
}
