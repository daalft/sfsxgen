import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrosswordComponent } from 'src/components/crossword.component';
import { LessonPreparerComponent } from 'src/components/lesson.preparer.component';
import { XGenComponent } from 'src/components/xgen.component';
import { XGenGeneratorComponent } from 'src/components/xgen.generator';

const routes: Routes = [
  {path: 'cw', component: CrosswordComponent},
  {path: 'xgengen', component: XGenGeneratorComponent},
  {path: 'lessonpreparer', component: LessonPreparerComponent},
  {path: 'xgen', component: XGenComponent},
  {path: '**', component: XGenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
