import { Component, OnInit, DoCheck, OnDestroy, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Data, Params, Router, UrlSegment, NavigationStart, NavigationEnd } from '@angular/router';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from 'src/app/recipes/recipe.model';
import { DataStorageService } from '../data-storage.service';
import { Subscription } from 'rxjs';



@Component({
    selector: 'app-display-blogs',
    templateUrl: './display-blogs.component.html',
    styleUrls: ['./display-blogs.component.css']
})
export class DisplayBlogs implements OnInit, DoCheck, OnDestroy {

    category: any;
    recipes: Recipe[];
    selectedRecipe: Recipe = null;
    routeSub: Subscription;

    subscription: Subscription;

    constructor(private route: ActivatedRoute,
        private recipeService: RecipeService,
        private dataStorage: DataStorageService,
        private router: Router) { }

    ngOnInit() {
        this.recipes = this.recipeService.getRecipes();
        this.subscription = this.dataStorage.fetchRecipes().subscribe(
            params => {
                if(params){
                this.recipes = params;
                }
            }
        )

        this.onALLBlogsRequested();


    }

    ngDoCheck() {

        this.route.data.subscribe(
            (data: Data) => {
                this.category = data['allBlogs'];
                if (this.route.firstChild) {
                    this.route.firstChild.data.subscribe(
                        (data: Data) => {
                            for (const dat in data) {
                                this.category = data[dat];
                                this.onBlogsRequestedByCategory(this.category);
                            }
                        });
                }
                if (!this.route.firstChild) {
                    this.onALLBlogsRequested();

                }

            }
        );

        this.onNavigationChanged()





    }

    onBlogsRequestedByCategory(category: string) {
        const bloposts: any = [];

        const recipesArray = this.recipeService.getRecipes();


        if (category === 'Automobiles') {

            for (let rec = 0; rec < recipesArray.length; rec++) {

                if (recipesArray.length > 0 && recipesArray[rec].category === category) {
                    bloposts.push(recipesArray[rec]);
                } else {
                    continue;

                }
            }



        }

        if (category === 'Technology') {


            for (let rec = 0; rec < recipesArray.length; rec++) {
                if (recipesArray.length > 0 && recipesArray[rec].category === category) {
                    bloposts.push(recipesArray[rec]);
                } else {
                    continue;
                }
            }


        } if (category === 'Animations') {

            for (let rec = 0; rec < recipesArray.length; rec++) {
                if (recipesArray.length > 0 && recipesArray[rec].category === category) {
                    bloposts.push(recipesArray[rec]);
                } else {
                    continue;
                }
            }



        }
        this.recipes = bloposts;




    }

    onALLBlogsRequested() {

        this.recipes = this.recipeService.getRecipes();


    }

    onRecipeClicked(clickedRecipe: Recipe) {
        this.selectedRecipe = clickedRecipe;
    }

    onCloseReceived() {
        this.selectedRecipe = null;

    }


    onNavigationChanged() {
        if(this.selectedRecipe) {
        this.routeSub = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.selectedRecipe = null;
            }
        });
    }
    }


    ngOnDestroy() {
        this.onCloseReceived();
        this.subscription.unsubscribe();
        if(this.routeSub != null) { 
            this.routeSub.unsubscribe();
        }
        
    }

}