<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Data;
use App\Http\Controllers\Auth\ResetPasswordController;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function index()
    {
        $data = DB::select('select * from Products');
        $jsonProduct = json_encode($data);
        return view('index', ['jsonProduct' => $jsonProduct]);
    }

    public function insertOrder(Request $request)
    {
        $data = DB::select("select Name ,Size from Products where Id like '$request->id'");

        $Name = $data[0]->Name;
        $Size = $data[0]->Size;

        DB::insert("
                insert into OrderDetail(Id,Name,Size,Qty)
                values ('$request->Id','$Name','$Size','$request->Qty')
            ");

        $data = DB::select('select * from Products');
        $jsonProduct = json_encode($data);

        return view('index', ['jsonProduct' => $jsonProduct]);
    }
}
