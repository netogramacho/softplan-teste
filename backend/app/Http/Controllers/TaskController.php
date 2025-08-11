<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskController extends Controller
{
    public function index(): AnonymousResourceCollection {
        return TaskResource::collection(Task::all());
    }

    public function store(Request $request): JsonResource {
        $task = Task::create([
            'title' => $request->input('title'),
            'completed' => false
        ]);

        return new TaskResource($task);
    }

    public function destroy(Task $task): Response {
        $task->delete();

        return response()->noContent();
    }
}
