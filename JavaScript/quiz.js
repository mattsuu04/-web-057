

$(function(){
    var quizArea = $('.quiz_area'); //クイズを管理するDOMを指定
    var quiz_html = quizArea.html(); //もう一度　を押した時に元に戻すため初期HTMLを変数で保管
    var quiz_cnt = 0; //現在の問題数を管理
    var quiz_fin_cnt = 5; //何問で終了か設定（クイズ数以下であること）
    var quiz_success_cnt = 0; //問題の正解数
    
    //クイズの配列を設定
    //answerの選択肢の数はいくつでもOK　ただし先頭を正解とすること(出題時に選択肢はシャッフルされる)
    var aryQuiz = [];
    aryQuiz.push(
        {
            question : '音楽のジャンルは世界中で何種類あるか？',
            answer : ['約1000種類', '約100種類', '約10種類', '約10000種類']
        }
        ,{
            question : '「音楽」として一般的に呼ばれているものは以下のどれ？',
            answer : ['楽器の演奏', '動物の鳴き声', '車や電車の音', '人間の喋り声']
        }
        ,{
            question : '「♩」この音符の名称として正しいのはどれ？',
            answer : ['４分音符', '２分音符', '８分音符', '16分音符']
        }
        ,{
            question : '「♪」この音符の名称として正しいのはどれ？',
            answer : ['８分音符', '４分音符', '２分音符', '16分音符']
        }
        ,{
            question : '「♯」この変化記号の意味として正しいのはどれ？',
            answer : ['半音上がる', '半音下がる', '元の音に戻る', '全音上がる']
        }
        ,{
            question : '4/4拍子の説明として正しいのはどれ？',
            answer : ['１小節の中に拍が４つあるもの', '１小節の中に拍が３つあるもの', '１小節の中に拍が２つあるもの', '１小節の中に拍が５つあるもの']
        }
        ,{
            question : '「♮」この変化記号の名称として正しいのはどれ',
            answer : ['ナチュラル', 'シャープ', 'フラット', 'クレシェンド']
        }
        ,{
            question : '付点◯◯音符/休符は元の音符の長さ何倍の長さ？',
            answer : ['１.５倍', '２倍', '３倍', '４倍']
        }
    );
    
    quizReset();
    
    //回答を選択した後の処理
    quizArea.on('click', '.quiz_ans_area ul li', function(){
        //画面を暗くするボックスを表示（上から重ねて、結果表示中は選択肢のクリックやタップを封じる
        quizArea.find('.quiz_area_bg').show();
        //選択した回答に色を付ける
        $(this).addClass('selected');
        if($(this).data('true')){
            //正解の処理 〇を表示
            quizArea.find('.quiz_area_icon').addClass('true');
            //正解数をカウント
            quiz_success_cnt++;
        }else{
            //不正解の処理
            quizArea.find('.quiz_area_icon').addClass('false');
        }
        setTimeout(function(){
            //表示を元に戻す
            quizArea.find('.quiz_ans_area ul li').removeClass('selected');
            quizArea.find('.quiz_area_icon').removeClass('true false');
            quizArea.find('.quiz_area_bg').hide();
            //問題のカウントを進める
            quiz_cnt++;
            if(quiz_fin_cnt > quiz_cnt){
                //次の問題を設定する
                quizShow();
            }else{
                //結果表示画面を表示
                quizResult();
            }
        }, 1500);
    });
    
    //もう一度挑戦するを押した時の処理
    quizArea.on('click', '.quiz_restart', function(){
        quizReset();
    });
    
    //リセットを行う関数
    function quizReset(){
        quizArea.html(quiz_html); //表示を元に戻す
        quiz_cnt = 0;
        quiz_success_cnt = 0;
        aryQuiz = arrShuffle(aryQuiz); //出題の順番をシャッフル
        quizShow();
    }
    
    //問題を表示する関数
    function quizShow(){
        //何問目かを表示
        quizArea.find('.quiz_no').text((quiz_cnt + 1));
        //問題文を表示
        quizArea.find('.quiz_question').text(aryQuiz[quiz_cnt]['question']);
        //正解の回答を取得する
        var success = aryQuiz[quiz_cnt]['answer'][0];
        //現在の選択肢表示を削除する
        quizArea.find('.quiz_ans_area ul').empty();
        //問題文の選択肢をシャッフル(自作関数) .concat()は参照渡し対策
        var aryHoge = arrShuffle(aryQuiz[quiz_cnt]['answer'].concat());
        //問題文の配列を繰り返し表示する
        $.each(aryHoge, function(key, value){
            var fuga = '<li>' + value + '</li>';
            //正解の場合はdata属性を付与する
            if(success === value){
                fuga = '<li data-true="1">' + value + '</li>';
            }
            quizArea.find('.quiz_ans_area ul').append(fuga);
        });
    }
    
    //結果を表示する関数
    function quizResult(){
        quizArea.find('.quiz_set').hide();
        var text = quiz_fin_cnt + '問中' + quiz_success_cnt + '問正解！';
        if(quiz_fin_cnt === quiz_success_cnt){
            text += '<br>全問正解おめでとう！！！！！！';
        }
        text += '<br><input type="button" value="もう一度挑戦する" class="quiz_restart p-10">';
        quizArea.find('.quiz_result').html(text);
        quizArea.find('.quiz_result').show();
    }
    
    //配列をシャッフルする関数
    function arrShuffle(arr){
        for(i = arr.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        return arr;
    }
});
