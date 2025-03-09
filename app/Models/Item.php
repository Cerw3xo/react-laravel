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
        'category_id',
        'img_path'

    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'count' => 'integer',
            'category_id' => 'integer'
        ];
    }

    protected $dispatchesEvents = [

        'created' => ItemCreated::class,

    ];

    public function user(): BelongsTo

    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo

    {
        return $this->belongsTo(Category::class);
    }
}
