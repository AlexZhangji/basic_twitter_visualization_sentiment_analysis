import { test } from 'qunit';
import moduleForAcceptance from 'itp404-final-project-ember/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | twitter data');

test('visiting /twitter-data', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('#input-search').length, 1);
    console.log('input search is there');
  });
});
