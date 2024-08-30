import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { Observable } from 'rxjs';
import {Location} from '@angular/common'
 
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {

  //Osserva gli eventi sulla route artists, restituisce la ParamMap che contiene tutti i   
  //parametri passati all’url
  routeObs !: Observable<ParamMap>; 
  artistObs !: Observable<Object>;
  albumObs !: Observable<Object>;
  artist : any; //Qui salverò la traccia selezionata
  artistsAlbums : any;
  //Usiamo la dependency injection per farci mandare i moduli del routing e dello    
  //SpotifyService
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private service: SpotifyService,
    private location: Location
    ) { }


  ngOnInit(): void {
    //Ottengo l'observable che notifica le informazioni sulla route attiva
    this.routeObs = this.route.paramMap;
    this.routeObs.subscribe(this.getRouterParam);
  }

  //Ogni volta che viene invocata la route artists/:id, l'observable richiama questo metodo
  getRouterParam = (params: ParamMap) =>
    {
      let artistId = params.get('id') || ''; //Ottengo l'id dai parametri
      console.log(artistId); //Stampo su console
      //spotifyServiceObs va dichiarato
      this.artistObs = this.service.getArtist(artistId);
      this.artistObs.subscribe((data)=>{ this.artist = data; console.log(this.artist);})
      
      this.richiestaAlbums(artistId)
    }

    richiestaAlbums(artistId: string) {
      this.albumObs = this.service.getArtistAlbums(artistId);
      this.albumObs.subscribe((data)=>{ this.artistsAlbums = data; console.log(this.artistsAlbums);});
      
    }

    back() : void
    {
      this.location.back();
    }
}