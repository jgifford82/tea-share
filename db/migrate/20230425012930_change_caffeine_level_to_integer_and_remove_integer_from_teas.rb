class ChangeCaffeineLevelToIntegerAndRemoveIntegerFromTeas < ActiveRecord::Migration[6.1]
  def change
    # Change caffeine_level column to integer
    change_column :teas, :caffeine_level, :integer, using: 'caffeine_level::integer'

    # Remove integer column
    remove_column :teas, :integer
  end
end
