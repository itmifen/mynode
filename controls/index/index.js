

/*
 * GET home page.
 */

//exports.index = function(req, res){
//  res.render('./views/index.html')
//};

exports=module.exports = function(req, res){
  res.render('index.html',{
		title: 'Wishlist Saver'
	})
};
