<?php

namespace App\Listeners;

use App\Events\ItemCreated;
use App\Models\User;
use App\Notifications\NewItem;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendItemCreatedNotifications implements ShouldQueue{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ItemCreated $event): void
    {
        foreach (User::whereNot('id', $event->item->user_id)->cursor() as $user) {

            $user->notify(new NewItem($event->item));

        }
    }
}
