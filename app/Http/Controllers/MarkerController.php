<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\User;
use App\Marker;

class MarkerController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //     //
    // }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $credits = 3 - Marker::where('user_id', auth()->user()->id)
           ->whereDate('created_at', Carbon::today()->toDateString())->count();

        if ($credits <= 0)
        {
            return ['status' => 'no_credits'];
        }

        $marker = new Marker;
        $marker->user_id = auth()->user()->id;
        $marker->latitude = $request->input('latitude');
        $marker->longitude = $request->input('longitude');
        $marker->save();

        return ['status' => 'success', 'credits' => $credits-1];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show($id)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function edit($id)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function destroy($id)
    // {
    //     //
    // }

    /**
     * Returns all data for the past 30 days.
     *
     * @return \Illuminate\Http\Response
     */
    public function fetch()
    {
        $markers = Marker::whereDate('created_at', '>', Carbon::now()->subDays(7))->get();

        $data = array();

        foreach ($markers as $marker)
        {
            array_push($data, [
                'name' => User::find($marker->user_id)->name,
                'latitude' => $marker->latitude,
                'longitude' => $marker->longitude,
            ]);
        }

        return $data;
    }
}
