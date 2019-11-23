<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Item;

class ItemController extends Controller
{
    public function index() {
        $all_items = Item::get();
        return $all_items;
    }
}
