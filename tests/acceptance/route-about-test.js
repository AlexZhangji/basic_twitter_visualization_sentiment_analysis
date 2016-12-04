import { test } from 'qunit';
import moduleForAcceptance from 'itp404-final-project-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | route about');

test('visiting /route-about', function(assert) {
  visit('/about');

  andThen(function() {
    // have list all 4 subsection on about page
    assert.equal(find('h2').length, 4);
  });
});
