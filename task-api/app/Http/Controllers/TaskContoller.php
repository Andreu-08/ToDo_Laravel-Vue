<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $task = Task::all();
        return response()->json($task);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'task' => 'required|string|max:200',
        ]);

        $task = Task::create([
           'task' => $validate ['task'],
           'completed' => false,
        ]);

        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validate = $request->validate([
            'completed' => 'required|boolean',
        ]);

        $task -> completed = $validate['completed'];
        $task -> save();

        return response()->json($task, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
     public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
