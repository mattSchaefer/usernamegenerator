class FixColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :words, :type, :word_type

  end
end
