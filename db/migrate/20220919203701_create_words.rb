class CreateWords < ActiveRecord::Migration[6.1]
  def change
    create_table :words do |t|
      t.string :type
      t.string :value

      t.timestamps
    end
  end
end
