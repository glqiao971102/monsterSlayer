new Vue({
    el: '#app',

    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsStart: false,
        turns: []

    },
    methods: {
        startGame: function(){
            this.gameIsStart = true
            this.playerHealth = 100
            this.monsterHealth = 100
            this.turns = []
        },
        attack: function(){
            // For player part

            let damage  = this.dealDamage(10, 3)
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits Monster for ${damage}`
            })

            if (this.checkWin()){
                return
            }

            // For Monster part
            this.monsterDamage()
        },
        specialAttack:function(){
            damage = this.dealDamage(20, 5)
            this.monsterHealth -= damage

            this.turns.unshift({
                isPlayer: true,
                text: `Player hits Monster Hard for ${damage}`
            })

            if (this.checkWin()){
                return
            }
            this.monsterDamage()
        },
        heal:function(){
            if(this.playerHealth >= 90){
                this.playerHealth = 100
            }else{
                this.playerHealth += 10
            }
            this.turns.unshift({
                isPlayer: true,
                text: `Player heal for 10`
            })
            this.monsterDamage()
        },
        giveUp: function(){
            this.gameIsStart = false
        },
        monsterDamage: function(){
            damage = this.dealDamage(15, 5)
            this.playerHealth -= damage
            this.checkWin()
            this.turns.unshift({
                isPlayer: false,
                text: `Monster hits player for ${damage}`
            });
            
        },
        dealDamage: function(max, min){
            return Math.max(Math.floor(Math.random() * max ) + 1, min)
        },
        checkWin: function(){
            if(this.monsterHealth <= 0){
                if(confirm('You won!. New game?')){
                    this.startGame()
                } else{
                    this.gameIsStart = false

                } 
                    return true
            }
                else if ( this.playerHealth <= 0){
                    if(confirm("You lost!, New game?")){
                        this.startGame()
                    }else {
                        this.gameIsStart = false
                    }
                    return true
                }
                return false
            }
        }

    }

)