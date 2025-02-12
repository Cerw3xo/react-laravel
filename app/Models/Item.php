<?php

namespace App\Models;

use App\Events\ItemCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [

        'name',
        'description',
        'price',
        'count',

    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'count' => 'integer',
        ];
    }

    protected $dispatchesEvents = [

        'created' => ItemCreated::class,

    ];

    public function user(): BelongsTo

    {
        return $this->belongsTo(User::class);
    }
}
