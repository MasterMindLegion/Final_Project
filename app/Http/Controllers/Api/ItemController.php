<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Items;

class ItemController extends Controller
{
    public function index() {
        $all_items = Items::get();
        return $all_items;
    }
}
