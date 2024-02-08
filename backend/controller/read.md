try {
        const productId = req.params.productId;
        // const userNameFromCookie = req.cookies.user_name;
        const userIdFromCookie = req.cookies.user_id;
        const { name, rating, comment } = req.body;
    
        // Find the product by ID
        const product = await Product.findById(productId);
    
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        // Check if the user has already submitted a review
        const existingReviewIndex = product.reviews.findIndex(
            (review) => review.user.toString() === userIdFromCookie
          );
          
        if (existingReviewIndex !== -1) {
          // Update the existing review
          product.reviews[existingReviewIndex].rating = rating;
          product.reviews[existingReviewIndex].Comment = comment;
        } else {
          // Add a new review
          product.reviews.push({
            user: userIdFromCookie,
            rating: req.body.rating,
            Comment: req.body.comment,
          });
          product.numberofReviews += 1;
        }
    
        // Recalculate the average rating
        const totalRating = product.reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        product.ratings = (totalRating / product.numberofReviews).toFixed(2);
    
        // Save the updated product
        await product.save();
    
        res.json({ success: true, product });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });





    issue1- tostring not interating
    issue2- comment not logging in mongo