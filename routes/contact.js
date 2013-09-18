
/*
 * GET Contact page.
 */

exports.contact = function(req, res){
  res.render('contact', { title: 'Contact the Jax Node User Group' });
};