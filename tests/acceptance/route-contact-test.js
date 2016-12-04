import { test } from 'qunit';
import moduleForAcceptance from 'itp404-final-project-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | route contact');

test('visiting /route-contact', function(assert) {
  visit('/contact');

  andThen(function() {
    assert.equal(find('.card-shadow').length, 2 );
  });
});
