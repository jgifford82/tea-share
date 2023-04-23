class TeaSerializer < ActiveModel::Serializer
  attributes :id, :name, :blend, :caffeine_level, :integer, :user_id, :category_id
end
