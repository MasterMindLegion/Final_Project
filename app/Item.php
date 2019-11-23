<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'items';
    
    public function charity () {
        return $this->belongsTo(Charity::class);
    }

    public function order () {
        return $this->belongsToMany(Orders::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }



}
