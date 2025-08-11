<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * @property-read int $id
 * @property-read string $uuid
 * @property string $title
 * @property boolean $completed
 */
class Task extends Model
{
    use HasUuids;

    protected $fillable = [
        'title',
        'completed',
    ];

    protected $guarded = ['uuid'];
    protected $hidden = ['id'];

    /**
     * @return string[]
     */
    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    /**
     * @return Attribute<string, string>
     */
    protected function title(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => str($value)->toString(),
            set: fn (?string $value) => str($value)
                ->trim()
                ->toString()
        );
    }
}
