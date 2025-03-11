use anchor_lang::prelude::*;

declare_id!("");  

#[program]
pub mod solana_lottery {
    use super::*;

    pub fn enter_lottery(ctx: Context<EnterLottery>) -> Result<()> {
        let lottery = &mut ctx.accounts.lottery;
        let participant = ctx.accounts.participant.key();
        lottery.participants.push(participant);
        Ok(())
    }

    pub fn pick_winner(ctx: Context<PickWinner>) -> Result<()> {
        let lottery = &mut ctx.accounts.lottery;
        let total_participants = lottery.participants.len();
        require!(total_participants > 0, LotteryError::NoParticipants);

        let random_index = (Clock::get()?.slot % total_participants as u64) as usize;
        let winner = lottery.participants[random_index];

        lottery.winner = Some(winner);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct EnterLottery<'info> {
    #[account(mut)]
    pub lottery: Account<'info, Lottery>,
    pub participant: Signer<'info>,
}

#[derive(Accounts)]
pub struct PickWinner<'info> {
    #[account(mut)]
    pub lottery: Account<'info, Lottery>,
}

#[account]
pub struct Lottery {
    pub participants: Vec<Pubkey>,
    pub winner: Option<Pubkey>,
}

#[error_code]
pub enum LotteryError {
    #[msg("No participants in the lottery")]
    NoParticipants,
}
