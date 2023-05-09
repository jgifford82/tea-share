class Review < ApplicationRecord
    # Review class inherits from ApplicationRecord, which inherits from ActiveRecord::Base, which allows use of macro methods, like belongs_to (sets up a connection with user & tea models so we can use review = Review.first; review.user; review.tea).
    # belongs_to must be singular for the macro to work properly, otherwise the inferred class will be wrongly pluralized too.
    belongs_to :tea
    belongs_to :user

    validates :comment, presence: true, length: { minimum: 2 }
    validates :rating, presence: true, inclusion: { in: 1..5, message: "must be between 1 and 5" }
end
